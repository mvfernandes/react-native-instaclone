import React from 'react';
import { View, FlatList } from 'react-native';
import {
    Post,
    Header,
    Avatar,
    Name,
    Description,
    Loading
} from './style';

import api from '../../api';
import LazyImage from '../../components/LazyImage';

const limitPage = 5;

export default class Feed extends React.Component {
    state = {
        feed: [],
        page: 1,
        totalPages: 0,
        loading: false,
        refreshing: false,
        viewable: []
    };

    loadPage = async (shouldRefresh = false) => {
        if (this.state.totalPages && this.state.page > this.state.totalPages) return;
        this.setState({ loading: true });

        const response = await api(this.state.page, limitPage);

        this.setState({
            feed: shouldRefresh ? response.data :
                [
                    ...this.state.feed,
                    ...response.data.filter(item => !this.state.feed.find(i => i.id === item.id))
                ],
            page: this.state.page + 1,
            loading: false,
            totalPages: response.totalPages
        });
    }

    refreshList = () => {
        this.setState({
            page: 1,
            refreshing: true,
            loading: true
        }, async () => {
            await this.loadPage(true);
            this.setState({ refreshing: false, loading: false });
        });
    }

    handleViewableChanged = ({ changed }) => {
        this.setState({ viewable: changed.map(({ item }) => item.id) });
    }

    componentDidMount = () => {
        this.loadPage();
    }

    render() {
        const { feed, loading, refreshing } = this.state;

        return (
            <View>
                <FlatList
                    data={feed}
                    keyExtractor={post => String(post.id)}
                    onEndReached={() => this.loadPage()}
                    onEndReachedThreshold={0.1}
                    onRefresh={this.refreshList}
                    refreshing={refreshing}
                    onViewableItemsChanged={this.handleViewableChanged}
                    viewabilityConfig={{ viewAreaCoveragePercentThreshold: 20 }}
                    ListFooterComponent={loading && <Loading />}
                    renderItem={({ item }) => (
                        <Post>
                            <Header>
                                <Avatar source={{ uri: item.author.avatar }} />
                                <Name>{item.author.name}</Name>
                            </Header>

                            <LazyImage
                                shouldLoad={this.state.viewable.includes(item.id)}
                                aspectRatio={item.aspectRatio}
                                smallSource={{ uri: item.small }}
                                source={{ uri: item.image }}
                            />

                            <Description>
                                <Name>{item.author.name}</Name> {item.description}
                            </Description>
                        </Post>
                    )}
                />
            </View>
        )
    }
};