import { combineForms } from 'react-redux-form';

export const FormReducer = combineForms({
    addStoryForm: { },
    aiAdminFilterForm: { 
        sortDescending: false,
        radioSelection: 'stageall',
    },
    dealCardForm: { },
    login: { username: '', password: '' },
    newDealCardForm: { },
    playbook: {
        id: -1, name: '', description: '', playbook_tag: [], switch: false
    },
    playbookClone: { },
    userDetails: { },
    accountDetails: { },
    playbookBoardAdvancedSearch: { },
    playbookCardForm: { },
    playbookCardTargetForm: { },
    playbooks: { id: -1, name: '', description: '' },
    sourceCardForm: {},
    targetCardForm: {},
    playbookBoard: -1,
    storyFilterForm: { },
    updateStoryNameForm: { },
    updateStoryOpptyForm: { },
    play: -1,
    notesForm: { 
        all: { formattedText: '', tags: {} },
        formattedStrings: {},
        tags: {},
        selectedTopic: {}
    },
    opptyPlanForm: {
        screenState: 'Why Buy, Why Now',
        callPlanCardSort: { value: 'Most Relevant', label: 'Most Relevant' },
        notesFieldFilter: { label: 'All', value: 'all' }
    },
    opptyPlanInfoForm: {},
    addOpptyPlanForm: {},
    opptyAddContactForm: {},
    addOpptyPlanCardForm: {},
    convoPlannerForm: {},
    convoPlannerFilterForm: {},
    transcriptForm: {
        selectedTopic: { label: 'Economic Drivers (0)', value: 'economic-drivers' }
    },
    gongCallForm: {
        all: { formattedText: '', tags: {} },
        formattedStrings: {},
        tags: {},
        selectedTopic: {},
        currentSelectedCard: {}
    },
    gongEmailForm: {
        all: { formattedText: '', tags: {} },
        formattedStrings: {},
        tags: {},
        selectedTopic: {},
        currentSelectedCard: {}
    }
}, 'form');
