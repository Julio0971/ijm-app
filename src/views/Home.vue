<script setup lang="ts">
import { useStore } from '../store'
import HomeStart from '../components/HomeStart.vue'
import HomeNotice from '../components/HomeNotice.vue'
import HomeSubject from '../components/HomeSubject.vue'
import HomeDilemma from '../components/HomeDilemma.vue'
import HomeThankYou from '../components/HomeThankYou.vue'
import HomeInstructions from '../components/HomeInstructions.vue'

const updateStep = async (step: 'home' | 'notice' | 'subject' | 'instructions' | 'dilemma' | 'thank-you') => {
    store.step = step

    localStorage.setItem('step', step)
}

const store = useStore()
</script>

<template>
    <Transition name="fade" mode="out-in">
        <HomeStart
            v-if="store.step == 'home'"
            @update-step="updateStep"
        />
        
        <HomeNotice
            v-else-if="store.step == 'notice'"
            @update-step="updateStep"
            />
            
        <HomeSubject
            v-else-if="store.step == 'subject'"
            @update-step="updateStep"
        />
        
        <HomeInstructions
            v-else-if="store.step == 'instructions'"
            @update-step="updateStep"
        />
        
        <HomeDilemma
            v-else-if="store.step == 'dilemma'"
            @update-step="updateStep"
        />
        
        <HomeThankYou
            v-else-if="store.step == 'thank-you'"
            @update-step="updateStep"
        />
    </Transition>
</template>