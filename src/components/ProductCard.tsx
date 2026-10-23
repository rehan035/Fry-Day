import React, { useState } from 'react';
import { Plus, MessageCircle, Utensils } from 'lucide-react';
import { Product, WhatsAppConfig } from '../types';
import { formatPKR, generateSingleProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  whatsAppConfig: WhatsAppConfig;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onSelectProduct,
  whatsAppConfig
}) => {
  const [imgError, setImgError] = useState(false);

  const handleWhatsAppQuickOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = generateSingleProductWhatsAppUrl(product, whatsAppConfig.phoneNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <article
      onClick={() => onSelectProduct(product)}
      className="group bg-white dark:bg-[#181614] rounded-2xl overflow-hidden border border-[#161412]/10 dark:border-white/10 flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer"
    >
      <div>
        {/* 4:3 Product Image with Zero-Broken-Image Fallback */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#1C1916]">
          {!imgError ? (
            <img
              src={product.img}
              alt={product.name}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#231F1B] to-[#161412] text-[#F4F1EA]">
              <Utensils className="w-7 h-7 text-[#F2B134] mb-2 opacity-80" />
              <span className="font-display font-bold text-sm">{product.name}</span>
            </div>
          )}
        </div>

        {/* Card Content — Unboxed Metadata + Title + Description */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col">
          {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#57524C] dark:text-[#B5AEA4] mb-1.5">
            <span className="font-medium">{product.cat}</span>
            {product.calories && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono-num">{product.calories}</span>
              </>
            )}
            {product.tag && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[#C8392B] dark:text-[#F2B134]">
                  {product.tag}
                </span>
              </>
            )}
          </div>

          <h3 className="font-display font-bold text-base sm:text-lg text-[#161412] dark:text-[#F4F1EA] leading-snug group-hover:text-[#C8392B] dark:group-hover:text-[#F2B134] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs sm:text-sm text-[#57524C] dark:text-[#B5AEA4] line-clamp-2 leading-relaxed mt-1.5">
            {product.desc}
          </p>

          {product.dealItems && product.dealItems.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-[#161412]/10 dark:border-white/10 text-xs text-[#57524C] dark:text-[#B5AEA4]">
              {product.dealItems.join(' · ')}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Tabular Price + 44px Touch Targets */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-3 flex items-center justify-between gap-2 border-t border-[#161412]/10 dark:border-white/10">
        <div>
          <span className="font-mono-num font-bold text-base sm:text-lg text-[#161412] dark:text-[#F4F1EA]">
            {formatPKR(product.price)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleWhatsAppQuickOrder}
            title={`Order ${product.name} on WhatsApp`}
            aria-label={`Order ${product.name} on WhatsApp`}
            className="min-h-[44px] min-w-[44px] px-3 rounded-xl border border-[#161412]/15 dark:border-white/15 text-[#161412] dark:text-[#F4F1EA] hover:border-[#25D366] hover:text-[#25D366] dark:hover:border-[#25D366] dark:hover:text-[#25D366] inline-flex items-center justify-center transition-colors active:scale-95"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
          </button>

          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to bag`}
            className="min-h-[44px] px-3.5 rounded-xl bg-[#F2B134] hover:bg-[#E09E22] text-[#161412] font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 transition-colors active:scale-95 whitespace-nowrap shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5] shrink-0" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
};
