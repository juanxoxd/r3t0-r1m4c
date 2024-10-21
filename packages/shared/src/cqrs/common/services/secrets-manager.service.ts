import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

@Injectable()
export class SecretsManagerService {
  private readonly logger = new Logger(SecretsManagerService.name);
  private client: SecretsManagerClient;

  constructor(
    private readonly configService: ConfigService,
  ) {
    const { region, accessKeyId, secretAccessKey} = this.configService.get('aws_config');
    this.client = new SecretsManagerClient({
      region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
  }

  async getSecret(secretName: string): Promise<any> {
    try {
      const command = new GetSecretValueCommand({ SecretId: secretName });
      const response = await this.client.send(command);
      console.log('Secret retrieved successfully', response);

      if ('SecretString' in response) {
        return JSON.parse(response.SecretString!);
      } else {
        throw new Error('Secret value is not available');
      }

    } catch (error) {
      console.error(`Error retrieving secret ${secretName}: ${error}`);
      this.logger.error(`Error retrieving secret ${secretName}`);
      throw new Error(`Could not retrieve secret: ${secretName}`);
    }
  }
}
