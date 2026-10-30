import { errorImageBase64 } from "@mukuu/common/lib/constants";

const placeholder = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const src = el.dataset.lazySrc;

      observer.unobserve(el);

      if (!src) return;

      const load = (url, onSuccess, onError) => {
        const image = new Image();

        image.referrerPolicy = "no-referrer";

        image.onload = () => onSuccess(url);
        image.onerror = onError;

        image.src = url;
      };

      // small画像を先に取得
      const smallUrl = src.replace("name=medium", "name=small");

      load(
        smallUrl,
        () => {
          el.src = smallUrl;

          // small表示後にmediumを取得
          load(
            src,
            () => {
              el.src = src;
            },
            () => {
              // medium失敗時はsmallを維持
            }
          );
        },
        () => {
          // small失敗時はmediumを試す
          load(
            src,
            () => {
              el.src = src;
            },
            () => {
              el.src = errorImageBase64;
            }
          );
        }
      );
    });
  },
  {
    rootMargin: "200px",
  }
);

export default {
  bind(el, binding) {
    el.referrerPolicy = "no-referrer";
    el.src = placeholder;
    el.dataset.lazySrc = binding.value;

    observer.observe(el);
  },

  update(el, binding) {
    if (binding.value === binding.oldValue) return;

    el.dataset.lazySrc = binding.value;

    observer.unobserve(el);
    observer.observe(el);
  },

  unbind(el) {
    observer.unobserve(el);
  },
};
