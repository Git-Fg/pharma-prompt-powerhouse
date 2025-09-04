'use client'

import type { ComponentProps } from 'react'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CopyButtonProps extends Omit<ComponentProps<typeof Button>, 'onClick'> {
  text: string
  label?: string
}

export function CopyButton({ ref, text, label = 'Copier', className, children, ...props }: CopyButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)

      toast.success('Copié !', {
        description: 'Le contenu a été copié dans le presse-papiers.',
      })
    }
    catch (err) {
      console.error('Failed to copy text: ', err)
      toast.error('Erreur', {
        description: 'Impossible de copier le contenu.',
      })
    }
  }

  return (
    <Button
      ref={ref}
      size="sm"
      variant="outline"
      onClick={copyToClipboard}
      className={cn(className)}
      {...props}
    >
      {copied
        ? (
            <>
              <Check className="size-4 mr-1" />
              Copié !
            </>
          )
        : (
            <>
              <Copy className="size-4 mr-1" />
              {children || label}
            </>
          )}
    </Button>
  )
}

CopyButton.displayName = 'CopyButton'
