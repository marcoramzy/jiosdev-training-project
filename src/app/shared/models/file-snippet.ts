class FileSnippet {
  static readonly IMAGE_SIZE = { width: 950, height: 721 };

  pending = false;
  status = 'INIT';

  constructor(public src: string, public file: File) { }
}
