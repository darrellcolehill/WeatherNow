import React from 'react';
import {
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';


interface UnitPickerProps {
    handleChange: (unit: string) => void;
    selectedUnit: string;
}


export function UnitPicker({handleChange, selectedUnit} : UnitPickerProps) {

    return (
        <View style={{ width:"100%", paddingLeft:"10%", paddingRight:"10%", }}>
            <Picker
                selectedValue={selectedUnit}
                style={{alignSelf:"center", width:"50%", minWidth: 150 }} // width:"50%"
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