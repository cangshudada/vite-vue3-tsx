import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
  setup() {
    return () => <RouterView />;
  },
});
