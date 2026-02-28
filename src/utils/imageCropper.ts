export const cropTransparentPixels = (imageUrlOrFile: string | File): Promise<string> => {
    return new Promise((resolve, reject) => {
        let objectUrl = '';
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // Attempt to bypass CORS for external URLs

        img.onload = () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return reject(new Error('Canvas context is not available'));
            }

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;

            let minX = canvas.width;
            let minY = canvas.height;
            let maxX = 0;
            let maxY = 0;

            let isTransparent = true;
            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const alpha = data[(y * canvas.width + x) * 4 + 3];
                    if (alpha > 0) {
                        isTransparent = false;
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                }
            }

            // If the image is completely transparent, return the original
            if (isTransparent) {
                return resolve(img.src);
            }

            const width = maxX - minX + 1;
            const height = maxY - minY + 1;

            const croppedCanvas = document.createElement('canvas');
            const croppedCtx = croppedCanvas.getContext('2d');
            if (!croppedCtx) {
                return reject(new Error('Cropped canvas context is not available'));
            }

            croppedCanvas.width = width;
            croppedCanvas.height = height;

            croppedCtx.drawImage(
                canvas,
                minX, minY, width, height, // Source rect
                0, 0, width, height // Dest rect
            );

            // Return as base64 PNG data URL
            resolve(croppedCanvas.toDataURL('image/png'));
        };

        img.onerror = (err) => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
            reject(new Error('Failed to load image for cropping. This might be due to CORS restrictions or an invalid URL/File.'));
        };

        if (imageUrlOrFile instanceof File) {
            objectUrl = URL.createObjectURL(imageUrlOrFile);
            img.src = objectUrl;
        } else {
            img.src = imageUrlOrFile;
        }
    });
};
