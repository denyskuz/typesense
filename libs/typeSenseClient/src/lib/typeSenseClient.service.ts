import { Inject, Injectable, Logger } from '@nestjs/common';
import * as Typesense from 'typesense';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';

@Injectable()
export class TypeSenseClientService {
  private readonly logger = new Logger(TypeSenseClientService.name);
  private typesenseClient!: Typesense.Client;

  constructor(
    @Inject('TYPESENSE_CONFIG')
    private config: {
      host: string;
      port: number;
      protocol: string;
      apiKey: string;
      connectionTimeoutSeconds: number;
    }
  ) {
    this.init();
  }

  private init() {
    this.typesenseClient = new Typesense.Client({
      nodes: [
        {
          host: this.config.host,
          port: this.config.port,
          protocol: this.config.protocol,
        },
      ],
      apiKey: this.config.apiKey,
      connectionTimeoutSeconds: this.config.connectionTimeoutSeconds,
    });
  }

  async createProductsCollection(
    schema: CollectionCreateSchema
  ): Promise<void> {
    try {
      await this.typesenseClient.collections().create(schema);
      this.logger.log('Collection created successfully');
    } catch (error) {
      if (error.httpStatus === 409) {
        this.logger.warn('Collection already exists');
      } else {
        this.logger.error('Error creating collection', error.message);
        throw error;
      }
    }
  }

  async searchProducts(query: string) {
    this.logger.log(`Searching for products with query: ${query}`);
    try {
      const searchResults = await this.typesenseClient
        .collections('products')
        .documents()
        .search({
          q: query,
          query_by: 'product_name,brands,categories_tags',
        });
      return searchResults;
    } catch (error) {
      this.logger.error('Error searching products', error.message);
      throw error;
    }
  }

  async handleImportProducts(collection: string, data: object) {
    try {
      await this.typesenseClient
        .collections(collection)
        .documents()
        .upsert(data);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
