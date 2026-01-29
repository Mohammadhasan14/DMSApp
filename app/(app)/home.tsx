import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/userSlice';

export default function HomeScreen() {
  const { userData, mobileNumber } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Welcome to DMS</Text>
      <Text>User: {mobileNumber}</Text>
      
      <View style={{ marginTop: 20, gap: 10 }}>
        <Button title="Upload New Document" onPress={() => {}} />
        <Button title="Search Documents" onPress={() => {}} />
        <Button title="Logout" color="red" onPress={() => dispatch(logout())} />
      </View>
    </View>
  );
}