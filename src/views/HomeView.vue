<script setup>
  import {ref} from 'vue'
  import volumnSVG from '../assets/volumn.svg'
  import { getUnit39Async } from '../apis';
  const { unit, getUnit, isLoading }=getUnit39Async()

  const mode=ref('vocabulary')
  const currentUnit=ref(0)
  const correctCount=ref(0)
  const unitList = Array.from({ length: 13 }, (_, index) => {
  const lesson = 26 + index;
  return `第${lesson}課`;
  });
  
  const playAudio = (audioBase64) => {
    const audio = new Audio(`data:audio/mp3;base64,${audioBase64}`);
    audio.play();
  }

  const vocabularyMode=()=>{
    mode.value='vocabulary'
    unit[currentUnit.value].vocabularies.sort((a,b)=>a.id-b.id)
  }

  const testMode = () => {
  mode.value = 'test'
  unit[currentUnit.value].vocabularies.forEach(vocabulary => {
    vocabulary.userAnswer = '';
  });
  shuffleVocabularies()
}

const shuffleVocabularies = () => {
  unit[currentUnit.value].vocabularies.sort(() => Math.random() - 0.5);
};

  const checkAnswer=()=>{
    correctCount.value=unit[currentUnit.value].vocabularies.filter(v=>v.userAnswer===v.answer).length
    mode.value='answer'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const changeUnit=(unit)=>{
    currentUnit.value=unit
    vocabularyMode()
  }
  getUnit()
</script>
<template>
  <div v-if="isLoading" class="">Loading...</div>
   <div v-if="!isLoading" class="container">
    <div class="unit-list-wrapper">
      <ul>
        <li v-for="(unit, index) in unitList" :key="index" @click="changeUnit(index)">
          {{unit}}
        </li>
      </ul>
    </div>
    <div class="vocabulary">
      <div class="change-mode">
        <button type="button" @click=vocabularyMode>單字模式</button>
        <button type="button" @click=testMode>考試模式</button>
        <span v-if="mode==='test'">※答案請用片假名或平假名回答</span>
        <span class="correct-count" v-if="mode==='answer'">答對題數 : {{ correctCount }}/{{ unit[currentUnit].vocabularies.length }}</span>
      </div>
        <ul>
          <li v-for="vocabulary in unit[currentUnit].vocabularies" :key="vocabulary.id">
            <div class="vocabulary-item">
              <div v-if="mode==='vocabulary'" class="vocabulary-word">{{ vocabulary.name }}</div>
              <input v-if="mode === 'test'|| mode === 'answer'" v-model="vocabulary.userAnswer" class="vocabulary-input" name="userAnswer" placeholder="" :disabled="mode==='answer'"/>
              <div class="vocabulary-meaning">{{ vocabulary.meaning }}</div>
              <div v-if="mode === 'vocabulary'" class="vocabulary-sentence">例句 : {{ vocabulary.sentence }}</div>
              <div v-if="mode === 'answer'&&vocabulary.userAnswer!==vocabulary.answer" class="vocabulary-answer">{{vocabulary.answer}}</div>
              <div v-if="mode === 'vocabulary'" class="vocabulary-button">
                <button @click="playAudio(vocabulary.speech)">
                  <img :src="volumnSVG" alt="Volume SVG" />
                </button>
              </div>
            </div>
            <hr>
          </li>
          <div v-if="mode==='test'" class="">
            <button type="button" @click="checkAnswer">提交答案</button>
          </div>
        </ul>
      </div>
   </div>
</template>
<style lang="scss" scoped>
  .container{
    width: 100%;
    display: flex;
    .unit-list-wrapper{
      width: 15%;
      background-color: #debd19;
      ul{
        width: 100%;
        height: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 2rem;
        li{
          font-size: 1.5rem;
          margin-bottom: 1.2rem;
          cursor: pointer;
        }
      }
    }
    .vocabulary{
      width: 85%;
      .change-mode{
        span{
          margin-left: 1rem;
        }
        .correct-count{
          color: #00670c;
        }
      }
      ul{
        border: 1px solid #000;
        padding: 3rem;
        .vocabulary-item {
        display: grid;
        grid-template-columns: 4fr 6fr 10fr 1fr;
        align-items: center;
        .vocabulary-input{
          width: 80%;
        }
        .vocabulary-answer{
          color: #e60000;
        }
      }
      }
      
    }
  }
</style>