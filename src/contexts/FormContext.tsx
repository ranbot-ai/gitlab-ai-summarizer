/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect, useContext, ReactNode, ChangeEvent, useCallback } from 'react';
import { getStorage, setStorage } from '../utils';
import { toast } from 'bulma-toast'
import debounce from "lodash/debounce"

interface FormData {
  gitlab: string;
  gitlabToken: string;
  gitlabAPIVersion: string;
  openAIKey: string;
}

interface FormContextType {
  formData: FormData;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    gitlab: '',
    gitlabToken: '',
    gitlabAPIVersion: 'api/v4',
    openAIKey: '',
  });

  useEffect(() => {
    getStorage(Object.keys(formData), result => {
      setFormData(prevFormData => ({
        ...prevFormData,
        ...result
      }));
    });
  }, []);

  const debouncedSave = useCallback(
    debounce((name: string, value: any) => {
      setStorage({ [name]: value }, () => {
        toast({
          message: 'Settings saved successfully',
          type: 'is-link',
          duration: 2000,
          position: 'top-left',
          pauseOnHover: true,
          animate: { in: 'fadeIn', out: 'fadeOut' },
        });
      });
    }, 1000),
    [1000]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    const updatedValue = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value;

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: updatedValue,
    }));

    debouncedSave(name, updatedValue);
  };

  return (
    <FormContext.Provider value={{ formData, handleChange }}>
      {children}
    </FormContext.Provider>
  );
};

const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export { FormProvider, useFormContext };
