"use client";
import { ReactNode } from 'react';
import ProtectedLayout from '@/components/ProtectedLayout';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <ProtectedLayout>
            <div>{children}</div>
        </ProtectedLayout>
    );
}
