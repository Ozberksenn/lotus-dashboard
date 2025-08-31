import {Button} from "@/components/ui/button";

export default function useHelpers() {
    const formatPrice = (price?: number | null) => {
        const defaultCurrency = 'USD'

        return price ? new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: defaultCurrency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(price) : undefined
    }

    const formatFullName = (firstName?: string, lastName?: string) => {
        return [firstName, lastName].filter(Boolean).join(' ')
    }

    const formatAvatarFallback = (user: {
        firstName?: string;
        lastName?: string;
    }): string => {
        const first = user.firstName?.trim() || "";
        const last = user.lastName?.trim() || "";

        if (first && last) {
            return (first[0] + last[0]).toUpperCase();
        }

        if (first) {
            return first.slice(0, 3).toUpperCase();
        }

        if (last) {
            return last.slice(0, 3).toUpperCase();
        }

        return "?";
    }

    const formatDate = (date?: string) => {
        if (!date) return ''
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString("tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    return {
        formatDate,
        formatPrice,
        formatFullName,
        formatAvatarFallback
    }
}