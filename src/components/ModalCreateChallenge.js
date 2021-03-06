import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Colors from "../utils/Colors";
import Text from "./Text";
import AlarmTime from "../utils/AlarmTime_TempData";
import { ScrollView } from "react-native-gesture-handler";
import Location from "../utils/Location_TempData";
import ThuocTinh from "../utils/ThuocTinh_TempData.js";
import {
  nextPageModal,
  backPageModal,
  resetPageModal,
} from "../redux/actions/ActionCreators";
import { connect } from "react-redux";

const uri_background =
  "https://i.pinimg.com/564x/e5/0f/aa/e50faa9333ca7505d268b9051203da74.jpg";
const uri_clock =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Alarm_Clock_Vector.svg/1200px-Alarm_Clock_Vector.svg.png";
const ModalCreateChallenge = (props) => {
  return (
    <Modal style={{ flex: 1 }} animationType="slide" visible={props.visible}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: uri_background }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            resizeMode: "stretch",
          }}
        ></ImageBackground>
        <View style={{ flexDirection: "row" }}>
          <BackButton
            completeChallenge={() => props.completeChallenge()}
            backPage={() => props.backPage()}
            numberPage={props.numberPage}
          ></BackButton>
          <TitleChallenge hideModal={() => props.displayModal()}></TitleChallenge>
          <NumberPages number={props.numberPage}></NumberPages>
        </View>
        <PageCreate
          resetPage={() => props.resetPage()}
          completeChallenge={() => props.completeChallenge()}
          NumberPages={props.numberPage}
          nextPage={() => {
            props.nextPage();
          }}
        ></PageCreate>
      </View>
    </Modal>
  );
};

const PageCreate = (props) => {
  if (props.NumberPages <= 1)
    return (
      <Page1
        nextPage={() => {
          props.nextPage();
        }}
      ></Page1>
    );
  if (props.NumberPages === 2)
    return (
      <Page2
        nextPage={() => {
          props.nextPage();
        }}
      ></Page2>
    );
  if (props.NumberPages === 3)
    return (
      <Page3
        nextPage={() => {
          props.nextPage();
        }}
      ></Page3>
    );
  if (props.NumberPages >= 4)
    return (
      <Page4
        completeChallenge={() => props.completeChallenge()}
        resetPage={() => props.resetPage()}
      ></Page4>
    );
};

const Page1 = (props) => {
  return (
    <ScrollView>
      <Text style={styles.h1}>TH???I GIAN</Text>

      <View
        style={{
          width: 350,
          alignSelf: "center",
          marginTop: 10,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* <Text style={{...styles.h2,marginLeft:-40}}>H??y ch???n c??c m???c th???i gian trong ng??y</Text> */}
        <Text style={{ ...styles.h3, marginTop: 20 }}>
          Theo nghi??n c???u khoa h???c n?????c n??n ???????c u???ng th?????ng xuy??n c??ch nhau 2
          gi??? ?????ng h???, 2 c???t m???c th???i gian ph???i u???ng ???? l?? 7:00 AM v?? 17:00 PM
          l?? t???t nh???t
        </Text>
      </View>
      {/* Line header */}
      {/* <Image style={{resizeMode:"stretch", height:80, width:150, alignSelf:"center"}} 
     source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Alarm_Clock_Vector.svg/1280px-Alarm_Clock_Vector.svg.png"}}></Image> */}
      <HeaderClock></HeaderClock>
      <ListAlarm></ListAlarm>

      <TouchableOpacity
        onPress={() => {
          props.nextPage();
        }}
        style={{
          ...styles.TitleButton,
          width: 200,
          marginTop: 30,
          backgroundColor: Colors.orange,
        }}
      >
        <Text style={{ ...styles.h3, color: Colors.white }}>Xong</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const Page2 = (props) => {
  return (
    <ScrollView>
      <Text style={styles.h1}>?????A ??I???M</Text>

      <View
        style={{
          width: 350,
          alignSelf: "center",
          marginTop: 10,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Text style={{ ...styles.h3, marginTop: 20 }}>
          U???ng n?????c th?????ng ???????c t???p luy???n v?? c?? nhi???u ngu???n n?????c s???ch nh??: Nh??
          ri??ng, Ch??? l??m c???a b???n, Qu??n n?????c , ... B???n n??n theo d??i gi??? gi???c ????
          b???n th?????ng ??? ????u ????? ch???n ?????a ??i???m ph?? h???p.
        </Text>
      </View>
      <HeaderPos></HeaderPos>
      <ListLocation></ListLocation>

      <TouchableOpacity
        onPress={() => {
          props.nextPage();
        }}
        style={{
          ...styles.TitleButton,
          width: 200,
          marginTop: 30,
          backgroundColor: Colors.orange,
        }}
      >
        <Text style={{ ...styles.h3, color: Colors.white }}>Xong</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const Page3 = (props) => {
  return (
    <ScrollView>
      <Text style={styles.h1}>THU???C T??NH</Text>

      <View
        style={{
          width: 350,
          alignSelf: "center",
          marginTop: 10,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Text style={{ ...styles.h3, marginTop: 20 }}>
          Challenge n??y sau khi ho??n th??nh b???n c?? th??? nh???n ???????c m???t trong c??c
          thu???c t??nh cho World c???a b???n nh?? sau {"\n"}
          H??y ch???n m???t trong s??? ch??ng
        </Text>
      </View>
      <HeaderHe></HeaderHe>

      <ListThuocTinh nextPage={() => props.nextPage()}></ListThuocTinh>
    </ScrollView>
  );
};

const Page4 = (props) => {
  return (
    <ScrollView>
      <Text style={styles.h1}>??I???U KHO???N</Text>

      <View
        style={{
          width: 350,
          alignSelf: "center",
          marginTop: 10,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Text style={{ ...styles.h3, marginTop: 20 }}>
          B???n ???? ch???n th???i gian, ?????a ??i???m cho Challenge th??nh c??ng r???i! {"\n"}
          Tuy nhi??n, ????? ?????m b???o cho ch???t l?????ng ph??t tri???n b???n th??n c???a b???n,
          ch??ng t??i mu???n b???n TUY??N TH??? s??? th??nh th???t khi check vi???c ???? ho??n
          th??nh trong challenge s???p t???i.{"\n"}
          V?? m???c ti??u b???n th??n! B???n s??? l??m ???????c th??i ^.^
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          props.completeChallenge();
          props.resetPage();
        }}
        style={{
          ...styles.TitleButton,
          width: 200,
          marginTop: 100,
          backgroundColor: Colors.orange,
        }}
      >
        <Text style={{ ...styles.h3, color: Colors.white }}>
          T??i ?????ng ??, ti???p t???c
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const TitleChallenge = (props) => {
  return (
    <TouchableOpacity
      style={styles.TitleButton}
      onPress={() => {
        props.hideModal();
      }}
    >
      <Text style={styles.h3}>WATER CHALLENGE</Text>
    </TouchableOpacity>
  );
};

const BackButton = (props) => {
  const checkBackPage = () => {
    if (props.numberPage === 1) props.completeChallenge();
    else props.backPage();
  };
  return (
    <TouchableOpacity
      onPress={() => checkBackPage()}
      style={{
        ...styles.TitleButton,
        marginLeft: 5,
        alignSelf: "flex-start",
        width: 50,
        color: props.color,
      }}
    >
      <Image
        style={{ width: 50, height: 50, alignSelf: "flex-start" }}
        source={{
          uri:
            "https://www.searchpng.com/wp-content/uploads/2019/02/Back-Arrow-Icon-PNG-715x715.png",
        }}
      ></Image>
    </TouchableOpacity>
  );
};

const NumberPages = (props) => {
  const numberpage = props.number + "/4";
  return (
    <TouchableOpacity
      style={{
        ...styles.TitleButton,
        width: 50,
        alignSelf: "flex-end",
        marginLeft: 30,
      }}
    >
      <Text style={styles.h3}>{numberpage}</Text>
    </TouchableOpacity>
  );
};

const HeaderClock = (props) => {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: 40,
        marginTop: 15,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{
            height: 20,
            width: 20,
            resizeMode: "contain",
            marginLeft: -20,
          }}
          source={{
            uri:
              "https://www.shareicon.net/data/128x128/2016/05/31/773530_flag_512x512.png",
          }}
        ></Image>
        <Text
          style={{
            marginLeft: 5,
            color: Colors.black,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          H???n gi???
        </Text>
      </View>
    </View>
  );
};

const HeaderPos = (props) => {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: 40,
        marginTop: 15,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{
            height: 20,
            width: 20,
            resizeMode: "contain",
            marginLeft: -20,
          }}
          source={{
            uri:
              "https://www.shareicon.net/data/128x128/2016/05/31/773530_flag_512x512.png",
          }}
        ></Image>
        <Text
          style={{
            marginLeft: 5,
            color: Colors.black,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          H???n ?????a ??i???m
        </Text>
      </View>
    </View>
  );
};

const HeaderHe = (props) => {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: 40,
        marginTop: 15,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{
            height: 20,
            width: 20,
            resizeMode: "contain",
            marginLeft: -20,
          }}
          source={{
            uri:
              "https://www.shareicon.net/data/128x128/2016/05/31/773530_flag_512x512.png",
          }}
        ></Image>
        <Text
          style={{
            marginLeft: 5,
            color: Colors.black,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          L???a ch???n thu???c t??nh
        </Text>
      </View>
    </View>
  );
};
const ListAlarm = (props) => {
  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      style={{ alignContent: "flex-start" }}
      data={AlarmTime}
      renderItem={({ item }) => <CardTime Time={item.Time}></CardTime>}
    ></FlatList>
  );
};

const CardTime = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.TitleButton, width: 350, flexDirection: "row" }}
      onPress={() => {}}
    >
      <Image
        style={{ width: 80, height: 50, resizeMode: "stretch" }}
        source={{ uri: uri_clock }}
      ></Image>
      <Text style={styles.h3}>{props.Time}</Text>
    </TouchableOpacity>
  );
};

const ListLocation = (props) => {
  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      style={{ alignContent: "flex-start" }}
      data={Location}
      renderItem={({ item }) => <CardLocation pos={item.pos}></CardLocation>}
    ></FlatList>
  );
};

const CardLocation = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.TitleButton, width: 350, flexDirection: "row" }}
      onPress={() => {}}
    >
      <Text style={styles.h3}>{props.pos}</Text>
    </TouchableOpacity>
  );
};

const ListThuocTinh = (props) => {
  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      style={{ alignContent: "center", alignSelf: "center" }}
      data={ThuocTinh}
      numColumns={2}
      renderItem={({ item }) => (
        <CardThuocTinh
          nextPage={() => props.nextPage()}
          uri={item.uri}
        ></CardThuocTinh>
      )}
    ></FlatList>
  );
};

const CardThuocTinh = (props) => {
  return (
    <TouchableOpacity onPress={() => props.nextPage()}>
      <Image
        style={{ width: 180, height: 200, resizeMode: "cover", margin: 10 }}
        source={{ uri: props.uri }}
      ></Image>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Image: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: Colors.orange,
  },
  TitleButton: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: Colors.paleWhite,
    borderRadius: 40,
    height: 50,
    width: 220,
    alignSelf: "center",
    marginLeft: 30,
    marginRight: 10,
  },
  h3: {
    color: Colors.black,
    fontSize: 16,
  },
  h1: {
    color: Colors.darkRed,
    fontSize: 25,
    alignSelf: "center",
    textAlign: "center",
  },
  h2: {
    color: Colors.primaryDark,
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    alignContent: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    numberPage: state.modalCreateChallengeReducer.numberPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    nextPage: () => dispatch(nextPageModal()),
    backPage: () => dispatch(backPageModal()),
    resetPage: () => dispatch(resetPageModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalCreateChallenge);
