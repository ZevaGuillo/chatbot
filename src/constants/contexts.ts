import React from 'react';
import type { Chat } from '../types/chat';
import type { ChatOptions } from '../types/options';

/**
 * Contexto que proporciona acceso a los datos y funciones del chat.
 */
export const ChatContext = React.createContext<Chat | null>(null);

/**
 * Contexto que proporciona las opciones de configuración del chat.
 */
export const ChatOptionsContext = React.createContext<ChatOptions | null>(null);
