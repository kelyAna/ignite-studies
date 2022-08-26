import { ImgHTMLAttributes } from 'react'
import styles from './Avatar.module.css'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean
}

export function Avatar({ hasBorder, src, alt, ...props }: AvatarProps) {
  return (
    <img 
     className={hasBorder ? styles.avatarWithBorder : styles.avatar}
     src={src}
     alt={alt}
     {...props}
    />
  )
}