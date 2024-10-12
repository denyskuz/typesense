import * as fs from 'fs';
import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { TypeSenseClientService } from '@type-sense/typeSenseClient';
import * as readline from 'readline';

@Injectable()
export class ETLService {
  constructor(private readonly typeClient: TypeSenseClientService) {}

  async handleImportProducts() {
    try {
      console.log('Starting product import...');

      console.log('start import ------>');
      const fileStream = fs.createReadStream(
        join(__dirname, '../../../reduced_openfoodfacts-products.jsonl')
      );

      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

      for await (const line of rl) {
        const product = JSON.parse(line);
        console.log('product ===>', product);
        try {
          await this.typeClient.handleImportProducts('products', {
            product_name: product.product_name,
            categories_tags: product.categories_tags,
            brands: product.brands,
            nutriments: product.nutriments,
            countries_tags: product.countries_tags,
            ingredients_text: product.ingredients_text,
            ingredients_analysis_tags: product.ingredients_analysis_tags,
            allergens_tags: product.allergens_tags,
          });
          console.log(`Product ${product.product_name} inserted successfully`);
        } catch (error) {
          console.error(
            `Failed to insert product ${product.product_name}:`,
            error
          );
        }
      }
    } catch (error) {
      console.error('Error importing products:', error);
    }
  }
}
