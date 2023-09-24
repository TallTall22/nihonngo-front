import axios from "axios";
import { reactive, ref } from "vue";

const base_url = 'http://localhost:3001';

export const getUnit39Async = () => {
  const unit39 = reactive({
    id:39,
    title: "遅れて、すみません",
    vocabularies:[]
  });
  const isLoading = ref(false);

  const getUnit39 = async () => {
    isLoading.value = true;
    
    try {
      const res = await axios.get(base_url);
      Object.assign(unit39,res.data)
    } catch (error) {
      console.error("Error fetching Unit 39 data:", error);
    } finally {
      isLoading.value = false;
    }
  }

  return { unit39, getUnit39, isLoading };
}
