import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiUser, FiMail, FiX, FiExternalLink } from 'react-icons/fi';
import { subscribeToNotifications } from '../../lib/supabase';

const NotificationListener = () => {
  const [notifications, setNotifications] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Subscribe to real-time notifications
    const channel = subscribeToNotifications((type, data) => {
      const notification = {
        id: Date.now(),
        type,
        data,
        timestamp: new Date(),
        read: false
      };

      setNotifications(prev => [notification, ...prev.slice(0, 9)]); // Keep last 10
      setIsVisible(true);

      // Auto-hide after 10 seconds
      setTimeout(() => {
        setNotifications(prev => 
          prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
        );
      }, 10000);

      // Show browser notification if permission granted
      if (Notification.permission === 'granted') {
        const title = type === 'new_contact' 
          ? `New Contact: ${data.name}` 
          : 'Someone wants to hire you!';
        
        const body = type === 'new_contact'
          ? `${data.subject} - ${data.email}`
          : 'Someone clicked "Hire Me Now" on your portfolio!';

        new Notification(title, {
          body,
          icon: '/favicon.ico',
          tag: `portfolio-${type}-${data.id}`
        });
      }
    });

    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, []);

  const handleNotificationClick = (notification) => {
    if (notification.type === 'new_contact') {
      // Open email client
      const { name, email, subject } = notification.data;
      window.open(`mailto:${email}?subject=Re: ${subject}&body=Hi ${name},%0D%0A%0D%0AThank you for contacting me through my portfolio.%0D%0A%0D%0ABest regards,%0D%0AAbhinav Sharma`);
    } else if (notification.type === 'hire_me_click') {
      // Open contact section or phone
      window.open('tel:+919664309440');
    }
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setIsVisible(false);
  };

  if (!isVisible || notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <AnimatePresence>
        {notifications.filter(n => !n.read).map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className="mb-3 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-full ${
                    notification.type === 'new_contact' 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                      : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                  }`}>
                    {notification.type === 'new_contact' ? <FiMail size={16} /> : <FiUser size={16} />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {notification.type === 'new_contact' ? 'New Contact Message' : 'Hire Me Click!'}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {notification.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => clearNotification(notification.id)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FiX size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="mb-3">
                {notification.type === 'new_contact' ? (
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {notification.data.name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">
                      {notification.data.email}
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 text-sm">
                      <strong>Subject:</strong> {notification.data.subject}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 line-clamp-2">
                      {notification.data.message}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-800 dark:text-gray-200 text-sm">
                      🎉 Someone is interested in hiring you!
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                      They clicked "Hire Me Now" on your portfolio
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleNotificationClick(notification)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded-md transition-colors flex items-center justify-center space-x-1"
                >
                  <span>
                    {notification.type === 'new_contact' ? 'Reply' : 'Call Now'}
                  </span>
                  <FiExternalLink size={12} />
                </button>
                <button
                  onClick={() => clearNotification(notification.id)}
                  className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-xs transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <motion.div
              className="h-1 bg-blue-600"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 10, ease: 'linear' }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Clear all button */}
      {notifications.filter(n => !n.read).length > 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={clearAllNotifications}
          className="w-full mt-2 text-center text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 py-2"
        >
          Clear all notifications
        </motion.button>
      )}
    </div>
  );
};

export default NotificationListener;
