import React, { useEffect, useRef, useMemo, type RefObject } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import MarkdownIt from 'markdown-it';
import markdownLink from 'markdown-it-link-attributes';

import { useOptions } from '../../composables';
import styles from './Message.module.css';
import type { ChatMessage, ChatMessageText } from '../../types';
import { ChatFile } from '../ChatFile/ChatFile';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);

interface MessageProps {
  message: ChatMessage;
  ref:  RefObject<HTMLDivElement | null>;
  beforeMessageSlot?: React.ReactNode;
  className?: string;
  children?: React.ReactNode; 
}

export const Message: React.FC<MessageProps> = ({ message, beforeMessageSlot }) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const { options } = useOptions();

  const messageText = (message as ChatMessageText).text || '<Empty response>';

  const classes = [
    styles.chatMessage,
    message.sender === 'user' ? styles.fromUser : styles.fromBot,
    message.transparent ? styles.transparent : '',
  ].join(' ');

  const md = useMemo(() => {
    const md = new MarkdownIt({
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value;
          } catch {
            console.log();
          }
        }
        return '';
      },
    });
    md.use(markdownLink, {
      attrs: {
        target: '_blank',
        rel: 'noopener',
      },
    });
    return md;
  }, []);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ block: 'start' });
  }, []);

  const renderMarkdown = () => {
    return (
      <div
        className={styles.markdown}
        dangerouslySetInnerHTML={{ __html: md.render(messageText) }}
      />
    );
  };

  return (
    <div ref={messageRef} className={classes}>
      {beforeMessageSlot && <div className={styles.actions}>{beforeMessageSlot}</div>}
      {message.type === 'component' && options?.messageComponents?.[message.key] ? (
        React.createElement(options.messageComponents[message.key], message.arguments)
      ) : (
        renderMarkdown()
      )}
      {message.files?.length ? (
        <div className={styles.files}>
          {message.files.map((file) => (
            <ChatFile key={file.name} file={file} isRemovable={false} isPreviewable />
          ))}
        </div>
      ) : null}
    </div>
  );
};
