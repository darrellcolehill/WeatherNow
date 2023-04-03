import React from 'react';
import {
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from './style';


interface UnitPickerProps {
    handleChange: (unit: string) => void;
    selectedUnit: string;
}


export function UnitPicker({handleChange, selectedUnit} : UnitPickerProps) {

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedUnit}
                style={styles.picker}
                mode={"dialog"}
                onValueChange={(itemValue) => handleChange(itemValue)}
            >
                <Picker.Item enabled={false} label="Units" value="Units" />
                <Picker.Item label="Fahrenheit" value="Fahrenheit" />
                <Picker.Item label="Celsius" value="Celsius" />
                <Picker.Item label="Kelvin" value="Kelvin" />
            </Picker>
        </View>  
    )
}