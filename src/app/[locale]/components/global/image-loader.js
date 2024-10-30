import Image from "next/image";

export default function ImageLoader({ src, alt, sizes, style, fill }) {
  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      priority
      width={0}
      height={0}
      style={style}
      fill={fill}
    />
  );
}
