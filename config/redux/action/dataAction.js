import Auth from '@react-native-firebase/auth';
import Firestore from '@react-native-firebase/firestore';
import {DATA_GETUSERINFO} from './index';

function DataHandler() {
  const myUid = Auth().currentUser.uid;

  const userMap = Firestore().collection('dataDevices').doc(myUid);

  function getUserInfo() {
    return async (dispatch) => {
      try {
        const data = await userMap.get();

        const devicesCount = await userMap.collection('devices').get();
        let total = [];

        devicesCount.forEach((device) => total.push(device.data()));

        dispatch({
          type: DATA_GETUSERINFO,
          data: {...data.data(), deviceCount: total.length},
        });
        return data.data();
      } catch (error) {}
    };
  }

  function addDevices(data) {
    return async (dispatch) => {
      try {
        const checkDoc = await userMap.collection('devices').get();

        let dataDocId = [];
        checkDoc.forEach((doc) => dataDocId.push(doc.id));

        const checkDocExist = dataDocId.find((element) => element == data.doc);

        if (checkDocExist) {
          return 'Devices already exist';
        } else {
          await userMap.collection('devices').doc(data.doc).set({});
          return null;
        }
      } catch (error) {
        return error;
      }
    };
  }

  async function getDevices() {
    const getData = await userMap.collection('devices').get();

    let data = [];
    getData.forEach((doc) => data.push(doc.id));

    return data;
  }

  return {getUserInfo, getDevices, addDevices};
}

const dataHandler = DataHandler();
export default dataHandler;
