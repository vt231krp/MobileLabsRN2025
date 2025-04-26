export function formatBytes(bytes: number, decimals = 2, useBinary = true) {
  if (typeof bytes !== "number" || !Number.isFinite(bytes) || bytes <= 0) {
    return "0 Bytes";
  }

  const k = useBinary ? 1024 : 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = useBinary
    ? ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
    : ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const unitIndex = Math.min(i, sizes.length - 1);

  const value = bytes / Math.pow(k, unitIndex);

  const finalDecimals = unitIndex === 0 ? 0 : dm;
  const formattedValue = parseFloat(value.toFixed(finalDecimals));

  return `${formattedValue} ${sizes[unitIndex]}`;
}
