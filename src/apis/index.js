import axios from "axios";
import { reactive, ref } from "vue";

const base_url = 'https://test.just-for-test-shop.de/';

export const getUnit39Async = () => {
  const unit = reactive({
    id:39,
    title: "遅れて、すみません",
    vocabularies:[]
  });
  const isLoading = ref(false);

  const getUnit = async () => {
    isLoading.value = true;
    
    try {
      const res = await axios.get(base_url);
      Object.assign(unit,res.data)
    } catch (error) {
      console.error("Error fetching Unit 39 data:", error);
    } finally {
      isLoading.value = false;
    }
  }

  return { unit, getUnit, isLoading };
}
