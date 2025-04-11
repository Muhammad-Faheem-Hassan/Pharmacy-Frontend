import { ETaskStatuses } from "./ETaskStatuses.enum";

export const TaskStatusesLabels = {
    INITIAL_REVIEW: 'Initial Review',
    TRANSLATION: 'Translation',
    CAPTIONING: 'Captioning',
    APPROVAL: 'Approval',
    PUBLISHED: 'Published'
};

export const TaskStatuses = [
    {
        value: ETaskStatuses.INITIAL_REVIEW,
        label: TaskStatusesLabels.INITIAL_REVIEW
    },
    {
        value: ETaskStatuses.TRANSLATION,
        label: TaskStatusesLabels.TRANSLATION
    },
    {
        value: ETaskStatuses.CAPTIONING,
        label: TaskStatusesLabels.CAPTIONING
    },
    {
        value: ETaskStatuses.APPROVAL,
        label: TaskStatusesLabels.APPROVAL
    },
    {
        value: ETaskStatuses.PUBLISHED,
        label: TaskStatusesLabels.PUBLISHED
    }
];