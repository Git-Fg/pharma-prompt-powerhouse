'use client';

import { usePWAStatus } from '@/hooks/usePWAStatus';
import { Badge } from '@/components/ui/badge';
import { WifiOff, Wifi, CheckCircle, RefreshCw } from 'lucide-react';

export function PWAStatusIndicator() {
  const { isOnline, isInstalled, isUpdating } = usePWAStatus();

  return (
    <div className="flex items-center gap-2">
      {/* Online/Offline Status */}
      <Badge variant={isOnline ? "secondary" : "destructive"} className="text-xs">
        {isOnline ? (
          <Wifi className="h-3 w-3 mr-1" />
        ) : (
          <WifiOff className="h-3 w-3 mr-1" />
        )}
        {isOnline ? 'En ligne' : 'Hors ligne'}
      </Badge>

      {/* Installation Status */}
      {isInstalled && (
        <Badge variant="default" className="text-xs bg-green-600 hover:bg-green-700">
          <CheckCircle className="h-3 w-3 mr-1" />
          Installé
        </Badge>
      )}

      {/* Update Status */}
      {isUpdating && (
        <Badge variant="outline" className="text-xs">
          <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
          Mise à jour...
        </Badge>
      )}
    </div>
  );
}