import React, { useState } from 'react';
import { Plus, MessageCircle, Flame, Eye } from 'lucide-react';
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
  const [imageLoaded, setImageLoaded] = useState(false);

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
      className="group bg-white dark:bg-[#1c1916] rounded-2xl overflow-hidden border border-[#141210]/10 dark:border-white/10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer relative"
    >
      <div>
        {/* Image Container with Shimmer */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#efe7da] dark:bg-[#25211c]">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-shimmer bg-[#efe7da] dark:bg-[#25211c]" />
          )}

          <img
            src={product.img}
            alt={product.name}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Tags */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {product.tag && (
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-[#c8392b] text-white px-2.5 py-0.5 sm:py-1 rounded-md shadow-sm">
                {product.tag}
              </span>
            )}
            {product.isDeal && (
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-[#f2b134] text-[#141210] px-2 py-0.5 rounded-md shadow-sm">
                Combo Deal
              </span>
            )}
          </div>

          {/* Quick preview hover badge */}
          <div className="absolute bottom-2.5 right-2.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-medium px-2 py-0.5 sm:py-1 rounded-md flex items-center gap-1">
            <Eye className="w-3 h-3" /> Customize
          </div>
        </div>

        {/* Content Body */}
        <div className="p-3.5 sm:p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-1.5 mb-1">
            <h3 className="font-display font-black text-base sm:text-lg text-[#141210] dark:text-white leading-snug group-hover:text-[#c8392b] dark:group-hover:text-[#f2b134] transition-colors">
              {product.name}
            </h3>
            {product.spicy && (
              <span title="Spicy" className="text-[#c8392b] dark:text-[#ff6b6b] mt-0.5 shrink-0">
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              </span>
            )}
          </div>

          <p className="text-[11px] sm:text-xs text-[#4a443f] dark:text-[#b8b0a5] line-clamp-2 leading-relaxed mb-2.5 flex-1">
            {product.desc}
          </p>

          {/* Deal items preview if deal */}
          {product.dealItems && product.dealItems.length > 0 && (
            <div className="mb-2.5 bg-[#f6f1e9] dark:bg-white/5 p-2 rounded-lg border border-[#141210]/5 dark:border-white/5 text-[10px] sm:text-[11px] text-[#141210] dark:text-white">
              <span className="font-bold text-[#c8392b] dark:text-[#f2b134] block mb-0.5">Includes:</span>
              <ul className="list-disc list-inside space-y-0.5 text-[#4a443f] dark:text-[#b8b0a5]">
                {product.dealItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Footer with Price and Actions */}
      <div className="px-3.5 pb-3.5 sm:px-5 sm:pb-5 pt-0 flex items-center justify-between gap-2 border-t border-[#141210]/5 dark:border-white/5 mt-auto">
        <div className="flex flex-col">
          <span className="font-display font-black text-base sm:text-lg text-[#141210] dark:text-white">
            {formatPKR(product.price)}
          </span>
          <span className="text-[9px] sm:text-[10px] text-[#4a443f] dark:text-[#b8b0a5] font-medium uppercase tracking-wider">
            PKR Net
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick WhatsApp order button */}
          <button
            onClick={handleWhatsAppQuickOrder}
            title="Direct WhatsApp Order"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#128C7E] dark:text-[#25D366] hover:text-white flex items-center justify-center transition-all duration-200 active:scale-95 border border-[#25D366]/30"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
          </button>

          {/* Add to Cart button */}
          <button
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to cart`}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#f2b134] hover:bg-[#e08e1b] text-[#141210] flex items-center justify-center font-bold transition-transform duration-200 active:scale-95 shadow-sm"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </article>
  );
};
