import { FileChecksum } from '@rails/activestorage/src/file_checksum';

const calculateChecksum = file => new Promise((resolve, reject) => {
  FileChecksum.create(file, (error, checksum) => (error ? reject(error) : resolve(checksum)));
});

export default async (file) => {
  const checksum = await calculateChecksum(file);

  return {
    checksum,
    filename: file.name,
    contentType: file.type,
    byteSize: file.size,
  };
};
