
import type { ReactNode } from 'react';
import styles from './Layout.module.css';

interface LayoutProps {
	children: ReactNode;
	className?: string;
}

const LayoutRoot: React.FC<LayoutProps> = ({ children, className }) => {
	return <div className={`${styles.layout} ${className || ''}`}>{children}</div>;
};

const Header: React.FC<{ children: ReactNode }> = ({ children }) => (
	<header className={styles.header}>{children}</header>
);

const Footer: React.FC<{ children: ReactNode }> = ({ children }) => (
	<footer className={styles.footer}>{children}</footer>
);

export const Layout = Object.assign(LayoutRoot, {
	Header,
	Footer,
});
