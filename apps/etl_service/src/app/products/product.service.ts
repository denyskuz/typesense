import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as unzipper from 'unzipper';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductService {
  private archiveUrl =
    'https://static.openfoodfacts.org/data/openfoodfacts-products.jsonl.gz';
  private archivePath = path.resolve(__dirname, 'products.jsonl.gz');
  private extractPath = path.resolve(__dirname, 'products.jsonl');

  async downloadAndExtractArchive(): Promise<any> {
    try {
      console.log('Starting download...');

      const response = await axios({
        method: 'GET',
        url: this.archiveUrl,
        responseType: 'stream',
      });

      const writer = fs.createWriteStream(this.archivePath);
      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      console.log('Download completed, starting extraction...');

      await this.extractArchive();

      console.log('Extraction completed, starting parsing...');
      const resp = await this.parseProducts();
      console.log('Parsed products:', resp);

      return resp;
    } catch (error) {
      console.error('Error during download and extraction:', error);
      throw new HttpException(
        'Failed to download and extract archive',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async extractArchive(): Promise<void> {
    const directory = await unzipper.Open.file(this.archivePath);
    await directory.files[0]
      .stream()
      .pipe(fs.createWriteStream(this.extractPath));

    console.log('Archive extracted to:', this.extractPath);
  }

  private async parseProducts(): Promise<any[]> {
    const fileContent = fs.readFileSync(this.extractPath, 'utf-8');
    const products = fileContent
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) => JSON.parse(line));

    products.forEach((product) => {
      console.log(product);
    });

    return products;
  }
}
