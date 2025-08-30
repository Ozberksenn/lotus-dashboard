"use client";

import React from "react";
import {ImagePlus, Trash2, Upload, Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export type ImageUploadProps = {
    /** Existing image as data URL (base64) or external URL */
    value?: string | null;
    /** Called with (dataUrl | null, originalFile?) */
    onChange?: (dataUrl: string | null, file?: File) => void;
    /** Max size in MB (default 2MB) */
    maxSizeMB?: number;
    /** Accept attribute (default image/*) */
    accept?: string;
    /** Circle preview for avatars */
    circle?: boolean;
    /** Disable interactions */
    disabled?: boolean;
    /** Width/height of preview (tailwind classes). Defaults to w-24 h-24 */
    sizeClassName?: string;
};

function fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export default function ImageUpload({
                                        value = null,
                                        onChange,
                                        maxSizeMB = 2,
                                        accept = "image/*",
                                        circle = true,
                                        disabled,
                                        sizeClassName = "w-24 h-24",
                                    }: ImageUploadProps) {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const dropRef = React.useRef<HTMLDivElement | null>(null);

    const [dragOver, setDragOver] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const handleFile = async (file?: File) => {
        if (!file) return;
        setError(null);

        if (!file.type.startsWith("image/")) {
            setError("Only image.");
            return;
        }

        const maxBytes = maxSizeMB * 1024 * 1024;
        if (file.size > maxBytes) {
            setError(`Max file size ${maxSizeMB}MB.`);
            return;
        }

        try {
            setLoading(true);
            const dataUrl = await fileToDataUrl(file);
            onChange?.(dataUrl, file);
        } catch (e) {
            console.error(e);
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        void handleFile(file);
        // allow re-selecting the same file
        e.currentTarget.value = "";
    };

    // Drag & Drop
    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (disabled) return;
        setDragOver(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        if (disabled) return;
        setDragOver(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (disabled) return;
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        void handleFile(file);
    };

    // Paste from clipboard (when focused inside drop area)
    React.useEffect(() => {
        const node = dropRef.current;
        if (!node) return;
        const onPaste = (e: ClipboardEvent) => {
            if (disabled) return;
            const item = Array.from(e.clipboardData?.items || []).find((i) => i.type.startsWith("image/"));
            const file = item?.getAsFile();
            if (file) {
                e.preventDefault();
                void handleFile(file);
            }
        };
        node.addEventListener("paste", onPaste as any);
        return () => node.removeEventListener("paste", onPaste as any);
    }, [disabled]);

    const remove = () => {
        onChange?.(null);
        setError(null);
    };

    return (
        <div className="grid gap-2">
            <div className="flex items-center gap-3">
                {/* Preview */}
                <div
                    className={`${sizeClassName} shrink-0 overflow-hidden ${circle ? "rounded-full" : "rounded-2xl"} bg-muted grid place-items-center border`}
                    aria-label="preview">
                    {value ? (
                        circle ? (
                            <Avatar className={`${sizeClassName} ${circle ? "rounded-full" : "rounded-2xl"}`}>
                                <AvatarImage src={value} alt="avatar"/>
                                <AvatarFallback>IMG</AvatarFallback>
                            </Avatar>
                        ) : (
                            <img src={value} alt="preview" className="w-full h-full object-cover"/>
                        )
                    ) : (
                        <ImagePlus className="w-6 h-6 opacity-60"/>
                    )}
                </div>

                {/* Dropzone */}
                <div
                    ref={dropRef}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    tabIndex={0}
                    className={`group w-full rounded-2xl border ${dragOver ? "border-dashed border-primary" : "border-dashed"} p-3 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                    aria-label="dropzone"
                >
                    <div className="flex items-center justify-between gap-2">
                        <div className="text-sm leading-tight">
                            <div className="font-medium">Drag & drop</div>
                            <div className="text-muted-foreground text-xs">or select file ({maxSizeMB}MB)</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                ref={inputRef}
                                type="file"
                                accept={accept}
                                hidden
                                onChange={onInputChange}
                                disabled={disabled}
                            />
                            <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}
                                    disabled={disabled || loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                        Loading
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mr-2 h-4 w-4"/>
                                        Select
                                    </>
                                )}
                            </Button>
                            {value && (
                                <Button type="button" variant="ghost" size="icon" onClick={remove} disabled={disabled}>
                                    <Trash2 className="h-4 w-4"/>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {error && <p className="text-xs text-destructive mt-1">{error}</p>}
        </div>
    );
}
