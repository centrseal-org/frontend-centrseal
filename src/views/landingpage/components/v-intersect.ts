import type { DirectiveBinding } from "vue";

export default {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    el.classList.add("hidden"); // Add the hidden class initially

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const callback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.remove("hidden"); // Remove the hidden class
          el.classList.add("animate__animated", binding.value as string);
          observer.unobserve(el);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
};
