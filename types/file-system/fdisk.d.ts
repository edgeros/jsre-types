declare module 'edgeros:fdisk' {
  import fdisk = require('fdisk');
  export = fdisk;
}

declare module "fdisk" {
  namespace fdisk {
    interface Fdisk {
      blkdev: string;
      size: number;
    }
    type FsType = "EMPTY" | "TPSFS" | "FAT" | "NTFS" | "LINUX" | "QNX" | "CDFS" | "EFI" | "RESERVED";
    interface Partition {
      active: boolean;
      fstype: FsType;
      size: number;
      offset: number;
      mount: string;
    }
    interface Block {
      type: "GPT" | "MBR";
      partition: Partition;
    }
    function list(): Fdisk[];
    function info(blkdev: string): Block;
    function partition(
      blkdev: string,
      partition: Array<Pick<Partition, "active"|"fstype"|"size"> & { name: string }>,
      type: "GPT" | "MBR"
    ): boolean;
    function remount(blkdev: string): boolean;
  }
  export = fdisk;
}
