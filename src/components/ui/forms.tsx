'use client'

import { useState, useRef, forwardRef, ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { easings } from './animated'
import { Check, AlertTriangle, Info, X } from 'lucide-react'

// Enhanced Input with floating labels and validation states
interface AnimatedInputProps extends Omit<HTMLMotionProps<'input'>, 'children'> {
  label?: string
  error?: string
  success?: boolean
  hint?: string
  icon?: ReactNode
  className?: string
}

export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ 
    label, 
    error, 
    success = false, 
    hint, 
    icon,
    className,
    onFocus,
    onBlur,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setHasValue(e.target.value !== '')
      onBlur?.(e)
    }

    return (
      <div className={cn('relative', className)}>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10">
              {icon}
            </div>
          )}
          
          <motion.input
            ref={ref}
            className={cn(
              'w-full px-4 py-3 border border-input rounded-md bg-background',
              'placeholder-transparent peer focus-ring transition-all duration-200',
              'focus:border-primary focus:bg-background/50',
              icon && 'pl-10',
              error && 'border-destructive focus:border-destructive',
              success && 'border-green-500 focus:border-green-500'
            )}
            placeholder={label}
            onFocus={handleFocus}
            onBlur={handleBlur}
            initial={false}
            animate={error ? { 
              x: [0, -10, 10, -5, 5, 0],
              transition: { duration: 0.4, ease: easings.bounce }
            } : {}}
            {...props}
          />
          
          {label && (
            <motion.label
              className={cn(
                'absolute left-4 text-sm pointer-events-none transition-all duration-200',
                'peer-placeholder-shown:text-muted-foreground peer-placeholder-shown:top-3',
                'peer-focus:-top-2 peer-focus:left-2 peer-focus:text-xs peer-focus:text-primary',
                'peer-focus:bg-background peer-focus:px-2',
                icon && 'peer-placeholder-shown:left-10 peer-focus:left-2',
                error && 'peer-focus:text-destructive',
                success && 'peer-focus:text-green-500'
              )}
              initial={false}
              animate={{
                top: isFocused || hasValue ? -8 : 12,
                fontSize: isFocused || hasValue ? '0.75rem' : '0.875rem',
                color: error ? 'var(--destructive)' : 
                       success ? 'var(--green-500)' :
                       isFocused ? 'var(--primary)' : 'var(--muted-foreground)'
              }}
              transition={{ duration: 0.2, ease: easings.smooth }}
            >
              {label}
            </motion.label>
          )}
          
          {/* Validation icons */}
          {(error || success) && (
            <motion.div
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.3, ease: easings.spring }}
            >
              {error && <AlertTriangle className="w-5 h-5 text-destructive" />}
              {success && <Check className="w-5 h-5 text-green-500" />}
            </motion.div>
          )}
        </div>
        
        {/* Error/Success/Hint messages */}
        {(error || hint) && (
          <motion.div
            className="mt-2 text-sm flex items-start gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: easings.smooth }}
          >
            {error && (
              <>
                <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
                <span className="text-destructive">{error}</span>
              </>
            )}
            {hint && !error && (
              <>
                <Info className="w-4 h-4 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">{hint}</span>
              </>
            )}
          </motion.div>
        )}
      </div>
    )
  }
)

AnimatedInput.displayName = 'AnimatedInput'

// Enhanced Select with smooth animations
interface AnimatedSelectProps {
  label?: string
  options: Array<{ value: string; label: string }>
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  error?: string
  className?: string
}

export function AnimatedSelect({
  label,
  options,
  value,
  onChange,
  placeholder = 'Sélectionner...',
  error,
  className
}: AnimatedSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div className={cn('relative', className)}>
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium">
            {label}
          </label>
        )}
        
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full px-4 py-3 text-left border border-input rounded-md bg-background',
            'focus-ring transition-all duration-200 flex items-center justify-between',
            'hover:border-primary hover:bg-background/50 hover-scale',
            error && 'border-destructive',
            isOpen && 'border-primary bg-background/50'
          )}
        >
            <span className={selectedOption ? 'text-foreground' : 'text-muted-foreground'}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2, ease: easings.smooth }}
            >
              <svg
                className="w-5 h-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </button>
      </div>
      
      {/* Dropdown */}
      <motion.div
        className={cn(
          'absolute top-full left-0 right-0 mt-2 bg-background border border-input rounded-md shadow-lg z-50',
          'max-h-60 overflow-y-auto'
        )}
        initial={false}
        animate={isOpen ? {
          opacity: 1,
          scale: 1,
          y: 0
        } : {
          opacity: 0,
          scale: 0.95,
          y: -10
        }}
        transition={{ duration: 0.2, ease: easings.spring }}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        {options.map((option, index) => (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              onChange?.(option.value)
              setIsOpen(false)
            }}
            className={cn(
              'w-full px-4 py-3 text-left hover:bg-accent hover:text-accent-foreground hover-scale',
              'transition-colors duration-150 border-b last:border-b-0',
              value === option.value && 'bg-primary/10 text-primary font-medium'
            )}
          >
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  delay: index * 0.05,
                  duration: 0.2,
                  ease: easings.smooth
                }}
              >
                {option.label}
              </motion.div>
            </button>
        ))}
      </motion.div>
      
      {error && (
        <motion.div
          className="mt-2 text-sm text-destructive flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: easings.smooth }}
        >
          <AlertTriangle className="w-4 h-4" />
          {error}
        </motion.div>
      )}
      
      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

// Enhanced Checkbox with smooth animations
interface AnimatedCheckboxProps {
  label?: string
  description?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export function AnimatedCheckbox({
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
  className
}: AnimatedCheckboxProps) {
  return (
    <div className={cn('flex items-start gap-3 hover-scale', className)}>
      <button
        type="button"
        onClick={() => !disabled && onChange?.(!checked)}
        disabled={disabled}
        className={cn(
          'relative w-5 h-5 border-2 rounded-md transition-all duration-200',
          'focus-ring flex items-center justify-center',
          checked ? 'border-primary bg-primary' : 'border-input bg-background',
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && 'hover:border-primary hover:bg-primary/10'
        )}
      >
        <motion.div
          initial={false}
          animate={checked ? {
            scale: 1,
            opacity: 1
          } : {
            scale: 0.5,
            opacity: 0
          }}
          transition={{ duration: 0.2, ease: easings.spring }}
        >
          <Check className="w-3 h-3 text-primary-foreground" />
        </motion.div>
      </button>
      
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <label 
              className={cn(
                'text-sm font-medium cursor-pointer',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
              onClick={() => !disabled && onChange?.(!checked)}
            >
              {label}
            </label>
          )}
          {description && (
            <p className={cn(
              'text-xs text-muted-foreground mt-1',
              disabled && 'opacity-50'
            )}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

// Enhanced Radio Group
interface RadioOption {
  value: string
  label: string
  description?: string
}

interface AnimatedRadioGroupProps {
  label?: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

export function AnimatedRadioGroup({
  label,
  options,
  value,
  onChange,
  disabled = false,
  className
}: AnimatedRadioGroupProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {label && (
        <label className="text-sm font-medium">
          {label}
        </label>
      )}
      
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => !disabled && onChange?.(option.value)}
            disabled={disabled}
            className={cn(
              'w-full p-3 text-left border rounded-md transition-all duration-200 hover-scale',
              'focus-ring flex items-start gap-3',
              value === option.value ? 'border-primary bg-primary/5' : 'border-input bg-background',
              disabled && 'opacity-50 cursor-not-allowed',
              !disabled && 'hover:border-primary hover:bg-primary/5'
            )}
            >
              <div className="relative w-5 h-5 mt-0.5">
                <div className={cn(
                  'w-full h-full border-2 rounded-full transition-all duration-200',
                  value === option.value ? 'border-primary' : 'border-input'
                )}>
                  <motion.div
                    className="w-full h-full rounded-full bg-primary"
                    initial={false}
                    animate={value === option.value ? {
                      scale: 0.5,
                      opacity: 1
                    } : {
                      scale: 0,
                      opacity: 0
                    }}
                    transition={{ duration: 0.2, ease: easings.spring }}
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="font-medium text-sm">
                  {option.label}
                </div>
                {option.description && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {option.description}
                  </div>
                )}
              </div>
            </button>
        ))}
      </div>
    </div>
  )
}