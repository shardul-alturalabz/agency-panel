'use client';

import React, { useState } from 'react';
import { Notification } from './NotificationFilters';
import { cn } from '@/lib/utils';

interface NotificationsListProps {
  notifications: Notification[];
}

const NotificationsList = ({ notifications }: NotificationsListProps) => {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payout':
        return '👤';
      case 'milestone':
        return '🎉';
      case 'security':
        return '⚠️';
      default:
        return '👤';
    }
  };

  return (
    <div className="flex gap-4 h-screen px-6 bg-[#151515] py-4 rounded-2xl overflow-hidden">
      <div className="space-y-1 w-1/2 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={cn(
              "flex items-start gap-4 p-4 rounded-lg transition-colors hover:bg-zinc-800/50 cursor-pointer group",
              selectedNotification?.id === notification.id && "bg-zinc-800/50"
            )}
            onClick={() => setSelectedNotification(notification)}
          >
            <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
            <div className="flex-1 space-y-1">
              <p className="text-sm text-zinc-200">{notification.title}</p>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span>{notification.timestamp.split(" ")[0]}</span>
                <span>{notification.timestamp.split(" ")[1]}</span>
              </div>
            </div>
            <div className="h-2 w-2 rounded-full bg-yellow-500 self-center group-hover:bg-yellow-400" />
          </div>
        ))}
      </div>

      <div className="w-1/2 bg-zinc-900/50 border-l border-zinc-800 p-6 overflow-y-auto">
        {selectedNotification ? (
          <div className="space-y-4">
            <div className="text-2xl">{getNotificationIcon(selectedNotification.type)}</div>
            <h2 className="text-lg font-semibold text-zinc-200">{selectedNotification.title}</h2>
            {selectedNotification.description && (
              <p className="text-sm text-zinc-400">{selectedNotification.description}</p>
            )}
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span>{selectedNotification.timestamp.split(" ")[0]}</span>
              <span>{selectedNotification.timestamp.split(" ")[1]}</span>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-zinc-500">
            Select a notification
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsList;
