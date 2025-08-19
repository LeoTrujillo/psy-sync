"use client";

import * as React from "react";

type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  duration?: number; // ms
};

type ToasterToast = Toast;

type State = {
  toasts: ToasterToast[];
};

export const ACTION_TYPES = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

// type ActionType = typeof ACTION_TYPES[keyof typeof ACTION_TYPES];

type Action =
  | { type: typeof ACTION_TYPES.ADD_TOAST; toast: ToasterToast }
  | { type: typeof ACTION_TYPES.UPDATE_TOAST; toast: Partial<ToasterToast> & { id: string } }
  | { type: typeof ACTION_TYPES.DISMISS_TOAST; toastId?: string }
  | { type: typeof ACTION_TYPES.REMOVE_TOAST; toastId?: string };

const addToRemoveQueue = (toastId: string, dispatch: React.Dispatch<Action>, delay = 1000) => {
  setTimeout(() => {
    dispatch({ type: ACTION_TYPES.REMOVE_TOAST, toastId });
  }, delay);
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TOAST: {
      return {
        ...state,
        toasts: [action.toast, ...state.toasts],
      };
    }
    case ACTION_TYPES.UPDATE_TOAST: {
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
    }
    case ACTION_TYPES.DISMISS_TOAST: {
      const { toastId } = action;

      // Si no hay id, desestima todos
      if (!toastId) {
        return {
          ...state,
          toasts: state.toasts.map((t) => ({ ...t, duration: 0 })),
        };
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId ? { ...t, duration: 0 } : t
        ),
      };
    }
    case ACTION_TYPES.REMOVE_TOAST: {
      if (!action.toastId) {
        // Elimina todos
        return { ...state, toasts: [] };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    }
    default:
      return state;
  }
};

const listeners = new Set<(state: State) => void>();

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

type ToastOpts = Omit<ToasterToast, "id"> & { id?: string };

export function toast(opts: ToastOpts) {
  const id = opts.id ?? crypto.randomUUID();

  const toast: ToasterToast = {
    id,
    title: opts.title,
    description: opts.description,
    action: opts.action,
    duration: typeof opts.duration === "number" ? opts.duration : 4000,
  };

  dispatch({ type: ACTION_TYPES.ADD_TOAST, toast });

  // Programar eliminación si vence la duración
  if (toast.duration && toast.duration > 0) {
    setTimeout(() => {
      dispatch({ type: ACTION_TYPES.DISMISS_TOAST, toastId: id });
      addToRemoveQueue(id, dispatch, 300); // pequeño delay para animaciones
    }, toast.duration);
  }

  return {
    id,
    dismiss: () => {
      dispatch({ type: ACTION_TYPES.DISMISS_TOAST, toastId: id });
      addToRemoveQueue(id, dispatch, 300);
    },
    update: (patch: Partial<Omit<ToasterToast, "id">>) => {
      dispatch({ type: ACTION_TYPES.UPDATE_TOAST, toast: { id, ...patch } });
    },
  };
}

/**
 * Hook para consumir los toasts en un Toaster component
 * Ejemplo:
 * const { toasts, dismiss } = useToast();
 */
export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return {
    ...state,
    dismiss: (toastId?: string) => {
      dispatch({ type: ACTION_TYPES.DISMISS_TOAST, toastId });
      if (toastId) addToRemoveQueue(toastId, dispatch, 300);
    },
    remove: (toastId?: string) => {
      dispatch({ type: ACTION_TYPES.REMOVE_TOAST, toastId });
    },
  };
}
