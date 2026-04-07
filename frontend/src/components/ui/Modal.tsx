import type { PropsWithChildren } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalProps extends PropsWithChildren {
  open: boolean;
  onClose?: () => void;
}

export function Modal({ open, onClose, children }: ModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-xl border-l border-white/10 bg-[#071021]/95 p-6 shadow-2xl"
            exit={{ opacity: 0, x: 40 }}
            initial={{ opacity: 0, x: 40 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          >
            {children}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
