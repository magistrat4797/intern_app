<template>
  <BaseCard class="intern-form">
    <BaseForm @submit.prevent="submitForm">
      <BaseInput v-model="newIntern.firstName" label="First Name" variant="outline" required />
      <BaseInput v-model="newIntern.lastName" label="Last Name" required />
      <BaseInput v-model="newIntern.image" label="Image URL" required />
      <BaseButton type="submit">Add User</BaseButton>
    </BaseForm>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/BaseCard.vue';
import BaseForm from '@/components/BaseForm.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useInterns from '@/composables/useInterns';

import type { NewIntern } from '@/models/intern';

const router = useRouter();
const { addIntern } = useInterns();

const newIntern = ref<NewIntern>({
  firstName: '',
  lastName: '',
  image: '',
});

const submitForm = async () => {
  await addIntern(newIntern.value);
  router.push('/');
};

</script>