-- Create a profile table for user data
CREATE TABLE public.profiles
(
    id           UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
    user_id      UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    display_name TEXT,
    email        TEXT,
    avatar_url   TEXT,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at   TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id)
);

-- Create a category table
CREATE TABLE public.categories
(
    id         UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
    user_id    UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    name       TEXT NOT NULL,
    color      TEXT                     DEFAULT '#F59E0B',
    icon       TEXT                     DEFAULT 'folder',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create an entry table
CREATE TABLE public.entries
(
    id          UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories (id) ON DELETE SET NULL,
    title       TEXT NOT NULL,
    content     TEXT,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create a collaborator table for sharing
CREATE TABLE public.collaborators
(
    id                 UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
    entry_id           UUID NOT NULL REFERENCES public.entries (id) ON DELETE CASCADE,
    invited_by         UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    collaborator_email TEXT NOT NULL,
    collaborator_id    UUID REFERENCES auth.users (id) ON DELETE SET NULL,
    invite_token       TEXT NOT NULL UNIQUE,
    status             TEXT                     DEFAULT 'pending' CHECK (status IN ('pending', 'accepted')),
    created_at         TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collaborators ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE
POLICY "Users can view own profile" ON public.profiles FOR
SELECT USING (auth.uid() = user_id);
CREATE
POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE
POLICY "Users can update own profile" ON public.profiles FOR
UPDATE USING (auth.uid() = user_id);

-- Categories policies
CREATE
POLICY "Users can view own categories" ON public.categories FOR
SELECT USING (auth.uid() = user_id);
CREATE
POLICY "Users can insert own categories" ON public.categories FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE
POLICY "Users can update own categories" ON public.categories FOR
UPDATE USING (auth.uid() = user_id);
CREATE
POLICY "Users can delete own categories" ON public.categories FOR DELETE
USING (auth.uid() = user_id);

-- Entries policies (owner access)
CREATE
POLICY "Users can view own entries" ON public.entries FOR
SELECT USING (auth.uid() = user_id);
CREATE
POLICY "Users can insert own entries" ON public.entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE
POLICY "Users can update own entries" ON public.entries FOR
UPDATE USING (auth.uid() = user_id);
CREATE
POLICY "Users can delete own entries" ON public.entries FOR DELETE
USING (auth.uid() = user_id);

-- Entries policies (collaborator access)
CREATE
POLICY "Collaborators can view shared entries" ON public.entries FOR
SELECT
    USING (
    EXISTS (
    SELECT 1 FROM public.collaborators
    WHERE collaborators.entry_id = entries.id
    AND collaborators.collaborator_id = auth.uid()
    AND collaborators.status = 'accepted'
    )
    );

CREATE
POLICY "Collaborators can update shared entries" ON public.entries FOR
UPDATE
    USING (
    EXISTS (
    SELECT 1 FROM public.collaborators
    WHERE collaborators.entry_id = entries.id
    AND collaborators.collaborator_id = auth.uid()
    AND collaborators.status = 'accepted'
    )
    );

-- Collaborators policies
CREATE
POLICY "Entry owners can manage collaborators" ON public.collaborators FOR ALL
USING (auth.uid() = invited_by);

CREATE
POLICY "Users can view collaborations they're part of" ON public.collaborators FOR
SELECT
    USING (collaborator_id = auth.uid() OR invited_by = auth.uid());

CREATE
POLICY "Collaborators can accept invites" ON public.collaborators FOR
UPDATE
    USING (collaborator_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Function to handle new user creation
CREATE
OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
INSERT INTO public.profiles (user_id, email, display_name)
VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data ->>'display_name', SPLIT_PART(NEW.email, '@', 1)));
RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT
    ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE
OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at
= now();
RETURN NEW;
END;
$$
LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE
    ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE
    ON public.categories
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_entries_updated_at
    BEFORE UPDATE
    ON public.entries
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
