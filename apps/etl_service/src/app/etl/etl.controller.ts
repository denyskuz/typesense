import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { ETLService } from './etl.service';

@Controller()
export class EtlMicroserviceController {
  constructor(private etlService: ETLService) {}

  @MessagePattern({ cmd: 'etl.importProducts' })
  async productseUser() {
    return this.etlService.handleImportProducts();
  }
}
