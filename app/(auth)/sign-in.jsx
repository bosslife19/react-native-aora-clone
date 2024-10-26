import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { signin } from '../../lib/appwrite'
const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async()=>{
    if( !form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the fields')
    }
    setisSubmitting(true);
    try {
       await signin(form.email, form.password);

      router.replace('/home');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message)
    }finally{
      setisSubmitting(false);
    }
    
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[84vh] px-4 my-6'>
          <Image source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text className='text-2xl text-semibold text-white mt-10 font-psemibold'>Log in to Aora</Text>
          <FormField 
            title='Email'
            value={form.email}
            handleChangeText={(e)=>setForm({
              ...form, email: e
            })}
            otherStyles='mt-7'
            keyBoardType='email-address'
          />

        <FormField 
            title='Password'
            value={form.password}
            handleChangeText={(e)=>setForm({
              ...form, password: e
            })}
            otherStyles='mt-7'
            
          />
          <CustomButton 
            title='Sign in'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}

          />
          <View className='justify-center pt-5 flex-row'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account?
            </Text>
            <Link href='/sign-up' className='text-lg font-psemibold text-secondary-100 ml-2'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn