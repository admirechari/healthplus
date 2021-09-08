import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { SearchBar } from "react-native-elements";
import Swipeable from "react-native-gesture-handler/Swipeable";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeperator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import colors from "../config/colors";
import FilterButton from "../components/FilterButtons";

const initialActivities = [
  {
    id: 1,
    title: "Prevention by Abstinence",
    description: "Video",
    category: "Prevention",
    image: require("../assets/coatofarms.png"),
  },
  {
    id: 2,
    title: "Importance of Adherence",
    description: "Quiz",
    category: "Treatment",
    image: require("../assets/coatofarms.png"),
  },
  {
    id: 3,
    title: "How to monitor CD4 count",
    description: "Factsheet",
    category: "Treatment",
    image: require("../assets/coatofarms.png"),
  },
  {
    id: 4,
    title: "Peer Pressure",
    description: "Video",
    category: "Prevention",
    image: require("../assets/coatofarms.png"),
  },
  {
    id: 5,
    title: "ART Basics",
    description: "Quiz",
    category: "Treatment",
    image: require("../assets/coatofarms.png"),
  },
  {
    id: 6,
    title: "What is CD4?",
    description: "Factsheet",
    category: "PMTCT",
    image: require("../assets/coatofarms.png"),
  },
];

function ActivitiesListScreen({ navigation }) {
  const [isFetching, setIsFetching] = useState(false);
  const [activities, setActivities] = useState(initialActivities);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [title1, setTitle1] = useState("Prevention");
  const [title2, setTitle2] = useState("Treatment");
  const [title3, setTitle3] = useState("PMTCT");
  let filterUsed = false;

  /*   useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); */

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const handleFilter1Selection = () => {
    setTitle1(title1);
    console.log("Filter button has been pressed for category ", title1);
    console.log("Unfiltered Activities List: ", activities);
    const newData = activities.filter(
      (activity) => activity.category === title1
    );
    setActivities(newData);
    console.log("New Filtered Activities List: ", newData);
    setIsFetching(false);
    filterUsed = true;
  };

  const handleFilter2Selection = () => {
    setTitle2(title2);
    console.log("Filter button has been pressed for category ", title2);
    console.log("Unfiltered Activities List: ", activities);
    const newData = activities.filter(
      (activity) => activity.category === title2
    );
    setActivities(newData);
    console.log("New Filtered Activities List: ", newData);
    setIsFetching(false);
    filterUsed = true;
  };

  const handleFilter3Selection = () => {
    setTitle3(title3);
    console.log("Filter button has been pressed for category ", title3);
    console.log("Unfiltered Activities List: ", activities);
    const newData = activities.filter(
      (activity) => activity.category === title3
    );
    setActivities(newData);
    console.log("New Filtered Activities List: ", newData);
    setIsFetching(false);
    filterUsed = true;
  };

  const renderHeader = () => {
    return (
      <>
        <SearchBar
          lightTheme
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction("")}
          placeholder="Type Here..."
          value={search}
        />
        {/* <View
          style={{
            backgroundColor: "#fff",
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        ></View> */}
        <View style={styles.btnGroup}>
          <FilterButton title={title1} onPress={handleFilter1Selection} />
          <FilterButton title={title2} onPress={handleFilter2Selection} />
          <FilterButton title={title3} onPress={handleFilter3Selection} />
        </View>
      </>
    );
  };

  const handleSelected = (item) => {
    console.log("Message selected is ", item);
    navigation.navigate("ActivityItemScreen", {
      selected: item,
    });
  };

  const fetchData = () => {
    setActivities(initialActivities);
    // dispatch(getAllDataAction(userParamData));
    setIsFetching(false);
  };

  const onRefresh = () => {
    setIsFetching(true);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        extraData={onRefresh}
        keyExtractor={(activity) => activity.id.toString()}
        renderItem={({ item }) => (
          /* <Swipeable
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          > */
          <ListItem
            title={item.title}
            description={item.description}
            category={item.category}
            image={item.image}
            onPress={() => handleSelected(item)}
          />
          /* </Swipeable> */
        )}
        ItemSeparatorComponent={ListItemSeparator}
        ListHeaderComponent={() => renderHeader()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DEF7E5",
    paddingRight: 20,
    paddingLeft: 20,
  },
  btnGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default ActivitiesListScreen;
