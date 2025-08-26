import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createFavicon() {
  try {
    // Read the SVG content
    const svgPath = path.join(__dirname, 'public', 'favicon.svg');
    const icoPath = path.join(__dirname, 'public', 'favicon.ico');
    
    // Convert SVG to ICO with multiple sizes
    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toBuffer()
      .then(buffer => {
        // For now, we'll create a PNG and rename it to ICO
        // Most modern browsers accept PNG as ICO
        return sharp(buffer)
          .resize(16, 16)
          .png()
          .toFile(path.join(__dirname, 'public', 'favicon-16.png'));
      });

    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, 'public', 'favicon-32.png'));

    // Create the main favicon.ico as a 32x32 PNG (browsers accept this)
    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toFile(icoPath);

    console.log('Favicon created successfully!');
    
    // Clean up temporary files
    if (fs.existsSync(path.join(__dirname, 'public', 'favicon-16.png'))) {
      fs.unlinkSync(path.join(__dirname, 'public', 'favicon-16.png'));
    }
    if (fs.existsSync(path.join(__dirname, 'public', 'favicon-32.png'))) {
      fs.unlinkSync(path.join(__dirname, 'public', 'favicon-32.png'));
    }
    
  } catch (error) {
    console.error('Error creating favicon:', error);
  }
}

createFavicon();
