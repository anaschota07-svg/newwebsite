interface AdPlaceholderProps {
  format?: 'horizontal' | 'vertical' | 'square'
  className?: string
}

export default function AdPlaceholder({ format = 'horizontal', className = '' }: AdPlaceholderProps) {
  const heights = {
    horizontal: 'min-h-[100px]',
    vertical: 'min-h-[600px]',
    square: 'min-h-[300px]',
  }

  return (
    <div className={`ad-container ${heights[format]} ${className}`}>
      <div className="text-center">
        <p className="ad-label">Advertisement</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 transition-colors duration-300">
          {format === 'horizontal' && '728x90 or 970x90'}
          {format === 'vertical' && '300x600 or 160x600'}
          {format === 'square' && '300x250 or 336x280'}
        </p>
      </div>
    </div>
  )
}
