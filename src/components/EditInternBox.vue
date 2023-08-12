<template>
  <BaseCard class="intern-form">
    <BaseForm @submit.prevent="submitForm">
      <div v-if="!editedIntern">
        <TheSpinner />
      </div>
      <template v-else>
        <BaseInput v-model="editedIntern.firstName" label="First Name" required/>
        <BaseInput v-model="editedIntern.lastName" label="Last Name" required/>
        <BaseInput v-model="editedIntern.image" label="Image URL" required/>
      </template>
      <BaseButton type="submit">Update User</BaseButton>
    </BaseForm>
  </BaseCard>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BaseCard from '@/components/BaseCard.vue';
import BaseForm from '@/components/BaseForm.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import TheSpinner from '@/components/TheSpinner.vue';

import useInterns from '@/composables/useInterns';

const route = useRoute();
const router = useRouter();
const { getInternForEdit, updateIntern, editedIntern } = useInterns();

onBeforeMount(() => {
  getInternForEdit(Number(route.params.id));
});

const submitForm = () => {
  if (editedIntern.value) {
    updateIntern(editedIntern.value);
    router.push('/');
  }
};

</script>