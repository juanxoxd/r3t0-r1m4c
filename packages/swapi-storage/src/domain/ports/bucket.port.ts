export interface ConfigBucket {
  key: string
  prefix: string
}

export interface BucketPort {
  saveAttachment(buffer: string, config: ConfigBucket): Promise<void>
  presignedUrl(key: string): Promise<string>
}
