import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
import "@/assets/base.css"

export default defineComponent({
  setup() {
    return () => <RouterView />;
  },
});
