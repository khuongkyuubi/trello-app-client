import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cardId: '',
    title: '',
    labels: [],
    members: [],
    watchers: [],
    activities: [],
    checklists: [],
    owner: '', // id of List contain card
    description: '',
    date: {
        startDate: null,
        dueDate: null,
        dueTime: null,
        completed: false,
    },
    attachments: [],
    cover: {
        color: null,
        isSizeOne: null,
    },
    colors: [
        // bg : background ; hbg : hover background
        {bg: '#61bd4f', hbg: '#519839'},
        {bg: '#f2d600', hbg: '#d9b51c'},
        {bg: '#ff9f1a', hbg: '#cd8313'},
        {bg: '#eb5a46', hbg: '#b04632'},
        {bg: '#c377e0', hbg: '#89609e'},
        {bg: '#0079bf', hbg: '#055a8c'},
        {bg: '#344563', hbg: '#172b4d'},
        {bg: '#ff78cb', hbg: '#c75bad'},
    ],
    pending: false,
}
//create slice
const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        reset: () => initialState, // reset state
        setPending: (state, action) => {
            state.pending = action.payload
        },
        setCard: (state, action) => {
            state.cardId = action.payload._id;
            state.title = action.payload.title;
            state.labels = action.payload.labels;
            state.members = action.payload.members;
            state.watchers = action.payload.watchers;
            state.activities = action.payload.activities;
            state.owner = action.payload.owner;
            state.listTitle = action.payload.listTitle;
            state.listId = action.payload.listId;
            state.boardId = action.payload.boardId;
            state.description = action.payload.description;
            state.checklists = action.payload.checklists;
            state.date = action.payload.date;
            state.attachments = action.payload.attachments;
            state.cover = action.payload.cover;
        },
        updateTitle: (state, action) => {
            state.title = action.payload
        },

        createLabel: (state, action) => {
            const { _id, text, color, backColor } = action.payload;
            state.labels.unshift({ _id, text, color, backColor, selected: true });
        },

        updateLabel: (state, action) => {
            const { labelId, text, color, backColor } = action.payload;
            state.labels = state.labels.map((label) => {
                if (label._id === labelId) {
                    label.text = text;
                    label.color = color;
                    label.backColor = backColor;
                }
                return label;
            });
        },
        updateLabelSelection: (state, action) => {
            const { labelId, selected } = action.payload;
            state.labels = state.labels.map((label) => {
                if (label._id === labelId) {
                    label.selected = selected;
                }
                return label;
            });
        },
        updateLabelSelectionOfCard: (state, action) => {
            const { listId, cardId, labelId, selected } = action.payload;
            state.checklists = state.checklists.map((list) => {
                if (list._id === listId) {
                    list.cards = list.cards.map((card) => {
                        if (card._id === cardId) {
                            card.labels = card.labels.map((label) => {
                                if (label._id === labelId) {
                                    label.selected = selected;
                                }
                                return label;
                            });
                        }
                        return card;
                    });
                }
                return list;
            });

        },

        deleteLabel: (state, action) => {
            state.labels = state.labels.filter((label) => label._id !== action.payload);
        },
        updateCreatedLabelId: (state, action) => {
            state.labels = state.labels.map((label) => {
                if (label._id === 'notUpdated') {
                    label._id = action.payload;
                }
                return label;
            });
        },
        addComment: (state, action) => {
            state.activities = action.payload;
        },
        deleteComment: (state, action) => {
            state.activities = state.activities.filter((act) => act._id !== action.payload);
        },
        updateComment: (state, action) => {
            const { commentId, text } = action.payload;
            state.activities = state.activities.map((activity) => {
                if (activity._id === commentId) {
                    activity.text = text;
                }
                return activity;
            });
        },
        updateSetAttachments: (state, action) => {
            state.attachments = action.payload.attachments;
            // state.attachments = [
            //     ...state.attachments,
            //     {
            //         link: action.payload.link,
            //         name: action.payload.name,
            //         date: action.payload.date
            //     }
            // ]
        },
        deleteAttachment: (state, action) => {
            // tae.attachments = state.attachments.filter((act) => act._id !== action.payload.card._id);
            state.attachments = action.payload.card.attachments;
            // console.log(state.attachments)
        },
        updateAttachments: (state, action) => {
            state.attachments = action.payload.card.attachments;
        },
        addMember: (state, action) => {
            const { memberId, memberName, memberColor } = action.payload;
            state.members.unshift({ user: memberId, name: memberName, color: memberColor });
        },
        deleteMember: (state, action) => {
            const { memberId } = action.payload;
            state.members = state.members.filter((member) => member.user !== memberId);
        },
        updateDescription: (state, action) => {
            state.description = action.payload.card.description;
        }
    }
});


// export actions
export const {
    reset,
    setPending,
    setCard,
    updateTitle,
    updateLabel,
    updateLabelSelection,
    updateLabelSelectionOfCard,
    createLabel,
    updateCreatedLabelId,
    addComment,
    deleteComment,
    updateComment,
    deleteLabel,
    updateSetAttachments,
    addMember,
    deleteMember,
    deleteAttachment,
    updateAttachments,
    updateDescription
} = cardSlice.actions;

//export reducer
export default cardSlice.reducer;


